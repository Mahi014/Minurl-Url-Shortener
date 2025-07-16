import {nanoid} from "nanoid";
import {getUrlByOriginal,getUrlByShortCode,createShortUrl,incrementClickCount} from "./urlModel.js";

export const shortenUrl = async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) {
    return res.status(400).json({ error: "original_url is required" });
  }
  try {
    //check if the long url already there
    const existing = await getUrlByOriginal(original_url);
    if (existing) {
      return res.json({ short_code: `${req.protocol}://${req.get("host")}/${existing.short_code}` });
    }
    //generate new short code
    const short_code = nanoid(4); 
    const newEntry = await createShortUrl(original_url, short_code);
    return res.status(201).json({ short_url: `${req.protocol}://${req.get("host")}/${short_code}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
export const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;
  try {
    const record = await getUrlByShortCode(shortCode);
    if (!record) {
      return res.status(404).send("Short URL not found");
    }
    //tracking clicks
    await incrementClickCount(shortCode);
    return res.redirect(record.original_url);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
