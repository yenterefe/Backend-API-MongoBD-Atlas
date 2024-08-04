const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const citySchema = require('../model/City');

const City = mongoose.model("City", citySchema);

router.post("/country", async (req, res) => {
    try {
        const { country, capitalCity } = req.body;

        let countryStored = await City.findOne({ country });

        if (!countryStored) {
            const newCity = new City({ country, capitalCity });
            await newCity.save();
            res.send(`Stored ${capitalCity} as the capital of ${country}.`);
        }
        else {
            res.status(400).send("country already exists. Please create a new country");
        }

    }
    catch (error) {
        res.status(400).send(error);
    }
})


router.get("/country/:country", async (req, res) => {
    try {
        let country = req.params.country;


        let countryStored = await City.findOne({ country });

        if (countryStored) {
            res.status(200).send(`the capital city of ${country} is ${countryStored.capitalCity}`);
        }
        else {
            res.status(400).send("the country does not exist. Please try another country");
        }
    }

    catch (error) {
        res.status(400).send(error);
    }
});

router.put("/country/:country", async (req, res) => {
    try {
        let country = req.params.country;

        const { capitalCity } = req.body;

        // Just replacing the name of the city 

        let storedCity = await City.findOne({ country });

        if (storedCity) {
            let updatedCity = await City.findOneAndUpdate({ country }, { capitalCity });
            res.status(200).send(`the capital city has of ${country} has been updated to ${capitalCity}`);
        }
        else {
            res.status(400).send("Country does not exist, cannot update");
        }
    }

    catch (error) {
        res.status(400).send(error);
    }

});

router.delete("/country/:country", async (req, res) => {
    try {
        let country = req.params.country;

        let storedCity = await City.findOne({ country });

        if (!storedCity) {
            res.status(400).send("Country does not existed. Cannot delete");
        }
        else {
            await City.findOneAndDelete({ country });

            res.status(200).send(`Country successfully deleted`);
        }
    }

    catch (error) {
        res.status(400).send(error);
    }

});

module.exports = router;