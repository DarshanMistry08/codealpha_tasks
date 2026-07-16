import User from '../models/Auth/User.model.js'
import Menu from '../models/Restaurant/menu.model.js    '
import mongoose from 'mongoose'
import { ApiError } from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js'
import config from '../config/config.js'
import { json } from 'express'
import Table from '../models/Restaurant/table.model.js'
import Order from '../models/Restaurant/order.model.js'
import AddOn from '../models/Restaurant/addOn.model.js'
import Payment from '../models/Restaurant/payment.model.js'

export async function GetAllItems(req, res) {

    const allItems = await Menu.find()
        .select("itemName description price available foodImg")

    res.status(200).json(
        new ApiResponse(200, allItems, "Here Is Our Menu")
    )
}

// use for 2 route with same function
export async function GetMyMenus(req, res) {

    const identifier = req.params.identifier || req.body.identifier;

    // console.log("Identifier:", identifier);
    // console.log("Valid:", mongoose.Types.ObjectId.isValid(identifier));

    // const menus = await Menu.findOne({ _id: identifier });

    // console.log(menus);  //null


    console.log(identifier)
    if (!identifier) {
        throw new ApiError(400, "Identifier is required");
    }

    const search = identifier
        .trim()
        .replace(/\s+/g, "")
        .toLowerCase();

    let menu;

    console.log(typeof search)    //string

    if (mongoose.Types.ObjectId.isValid(search)) {

        menu = await Menu.findOne({
            _id: identifier
        });

        console.log(menu);
        console.log(typeof menu)  //obj
        console.log(menu)   //null
        // console.log(mongoose.Types.ObjectId.isValid(search))
    } else {
        menu = await Menu.aggregate([
            {
                $addFields: {
                    normalizedName: {
                        $replaceAll: {
                            input: { $toLower: "$itemName" },
                            find: " ",
                            replacement: "",
                        },
                    },
                },
            },
            {
                $match: {
                    normalizedName: search,
                },
            },
            {
                $project: {
                    normalizedName: 0,
                },
            },
            // console.log("in aggregation")
        ]);
    }

    if (!menu) {
        throw new ApiError(404, "Menu item not found");
    }

    return res.status(200).json(
        new ApiResponse(200, menu, "Here is your menu item")
    );
}


export async function BookTable(req, res) {

    const { capacity, location } = req.body

    const table = await Table.create({
        capacity,
        location,
    })

    return res.status(201)
        .json(new ApiResponse(201, "table is available procees for Order"))

}


export async function PlaceOrder(req, res) {
    const { tableNumber } = req.body;

    const customer = req.user._id

    const table = await Table.findOne({ tableNumber });

    if (!table) {
        throw new ApiError(404, "Table not found enter you correct table Number");
    }
    if (table.status === "available") {
        table.status = "occupied"
        await table.save()
    } else if (
        table.status === "maintenance" || table.status === "reserved"
    )
        throw new ApiError(402, "You can go for the waiting we will contact soon")


    const order = await Order.create({
        customer,
        payment: null,
        items: [],
        table: table._id,
    });

    table.currentOrder = order._id
    await table.save()

    res.status(200).json(
        new ApiResponse(200, order, "Order Places wait for server")
    )

}



export async function AddInOrder(req, res) {
    const { tableNumber, itemName, quantity, addOns = [] } = req.body;

    // Find table
    const table = await Table.findOne({ tableNumber });

    if (!table) {
        throw new ApiError(404, "Table not found");
    }

    if (!table.currentOrder) {
        throw new ApiError(
            400,
            "Place your order first, then you can add items."
        );
    }

    const order = await Order.findById(table.currentOrder);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const menu = await Menu.findOne({ itemName });

    if (!menu) {
        throw new ApiError(404, "Menu item not found");
    }

    let addOnPrice = 0;
    const selectedAddOns = [];

    for (const addOnName of addOns) {

        const addOn = await AddOn.findOne({
            name: addOnName,
            isAvailable: true
        });

        if (!addOn) {
            throw new ApiError(400, `${addOnName} is not available yet`
            );
        }

        selectedAddOns.push({
            addOn: addOn._id,
            name: addOn.name,
            price: addOn.price,
        });
        addOnPrice += addOn.price;
    }

    // Calculate total price of this item
    const totalItemPrice = (menu.price + addOnPrice) * quantity;

    // Add item to order
    order.items.push({
        menuItem: menu._id,
        quantity,
        price: totalItemPrice,
        addOns: selectedAddOns
    });

    // Update order total
    order.totalOrder += totalItemPrice;
    order.orderStatus = "Ready"
    await order.save();

    // Return populated order
    const updatedOrder = await Order.findById(order._id)
        .populate({
            path: "items.menuItem",
            select: "itemName price category"
        });

    const response = {
        orderNumber: updatedOrder.orderNumber,
        status: updatedOrder.orderStatus,
        type: updatedOrder.orderType,
        total: updatedOrder.totalOrder,

        items: updatedOrder.items.map(item => ({
            itemName: item.menuItem.itemName,
            price: item.price,
            quantity: item.quantity,

            addOns: item.addOns.map(addOn => ({
                name: addOn.name,
                price: addOn.price
            }))
        }))
    };
    // updatedOrder.orderStatus = "Ready"
    // await updatedOrder.save()

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "Item added successfully"
        )
    );
}



export async function OrderPayment(req, res) {

    const { tableNumber, paymentMethod } = req.body;

    const table = await Table.findOne({ tableNumber });

    if (!table) {
        throw new ApiError(404, "Table not found");
    }

    const order = await Order.findById(table.currentOrder);

    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const payment = await Payment.create({
        customer: order.customer,
        order: order._id,
        table: order.table,
        amount: order.totalOrder,
        paymentStatus: "Paid",
        paymentMethod,
        paymentId: `PAY-${Date.now()}`,
        receiptNumber: `RCPT-${Date.now()}`,
    });


    order.payment = payment._id;
    order.orderStatus = "Completed";   // or "Completed", depending on your enum
    table.status = "available"
    await order.save();

    res.status(200).json(
        new ApiResponse(200, payment, "Thank you for visiting!")
    );

}



// Update the Order items 
export async function UpdateOrder(req, res) {
    const { orderid } = req.params

    const { itemName, quantity, addOns = [] } = req.body;
    console.log(quantity)
    console.log(req.body)
    // console.log(orderid)

    if (!orderid) {
        throw new ApiError(400, "Order Not found Place Order first ")
    }

    const order = await Order.findById(orderid)

    // console.log(order.customer)

    if (!order) {
        throw new ApiError(400, "Order Not found Enter correct Order or place order first")
    }


    const addeditem = [];

    for (const addOnName of addOns) {
        const addOn = await AddOn.findOne({
            name: addOnName,
            isAvailable: true,
        });

        if (!addOn) {
            throw new ApiError(
                400,
                `${addOnName} is not available`
            );
        }

        addeditem.push({
            addOn: addOn._id,
            name: addOn.name,
            price: addOn.price,
        });
    }

    const menu = await Menu.findOne({ itemName });

    if (!menu) {
        throw new ApiError(
            404,
            `${itemName} is not available`
        );
    }

    const addOnPrice = addeditem.reduce(
        (sum, item) => sum + item.price,
        0
    );

    const totalPrice = (menu.price + addOnPrice) * quantity;

    order.items.push({
        menuItem: menu._id,
        quantity,
        price: totalPrice,   // Store the final price
        addOns: addeditem,
    });

    // Recalculate the total order amount
    order.totalOrder = order.items.reduce(
        (sum, item) => sum + item.price,
        0
    );

    await order.save();

    const updatedPayment = await Payment.findOneAndUpdate(
        { order: order._id },
        {
            amount: order.totalOrder,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Order updated successfully"
        )
    )
}


export async function RemoveItems(req, res) {
    const { orderid } = req.params;
    const { itemName } = req.body;
    console.log(orderid)
    const order = await Order.findOne({ _id: orderid });
    console.log(order)  //null
    if (!order) {
        throw new ApiError(404, "Order not found");
    }

    const menu = await Menu.findOne({ itemName });

    if (!menu) {
        throw new ApiError(404, "Menu item not found");
    }

    order.items = order.items.filter(
        item => item.menuItem.toString() !== menu._id.toString()
    );

    order.totalOrder = order.items.reduce(
        (sum, item) => sum + item.price,
        0
    );

    await order.save();

    await Payment.findOneAndUpdate(
        { order: order._id },
        { amount: order.totalOrder },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            order,
            "Item removed successfully"
        )
    );
}