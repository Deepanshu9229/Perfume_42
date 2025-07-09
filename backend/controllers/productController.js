
// function to add product
const addProduct = async (req, res) => {
    console.log("Received files:", req.files);

    try {

        const { name, description, price, category, season, size, bestSeller } = req.body

        const image1 = req?.files?.image1?.[0];
        const image2 = req?.files?.image2?.[0];
        const image3 = req?.files?.image3?.[0];

            // ❗ Validate presence of files
    if (!image1 || !image2 || !image3) {
      return res.status(400).json({
        success: false,
        message: "All 3 images (image1, image2, image3) are required",
      });
    }

        console.log(name, description, price, category, season, size, bestSeller);
        console.log(image1, image2, image3);

        res.json({})

    } catch (error) {
        console.error("❌ Add Product Error:", error);
        res.json({ success: false, message: error.message })
    }
}

// function to list product
const listProduct = async (req, res) => {

}

// function to remove product
const removeProduct = async (req, res) => {

}

// function for single product info
const singleProduct = async (req, res) => {

}

export { listProduct, addProduct, removeProduct, singleProduct }