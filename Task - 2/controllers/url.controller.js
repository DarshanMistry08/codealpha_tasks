const { nanoid } = require('nanoid')
const URL = require('../models/url.model')


async function handlegenerateNewShortURL(req, res) {
    // console.log("BODY:", req.body);
    const body = req.body;
    if (!req.body || !req.body.url) {
        return res.status(400).json({ error: 'url is required' });
    }
    const shortID = nanoid(8);

await URL.create({
    ShortId: shortID,  
    redirectURL: body.url,
    visitHistory:[],  //late added
    createdBy: req.user._id,

});
return res.redirect("/");
//  return res.render('home', {
//         id: shortID,
//         // urls: allurls,
//     });
}

async function handlegenerateAnalytics(req,res){
    const ShortId = req.params.shortId;
    const result = await URL.findOne({ ShortId });

    if (!result) return res.status(404).json({ error: "Short URL not found" });

    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handlegenerateNewShortURL,handlegenerateAnalytics
}