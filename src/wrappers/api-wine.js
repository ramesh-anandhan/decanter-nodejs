var constant = require('../const/const');

const apiWines = {
    wines: (req, res) => {
        let wines = [
            {
                id: 'random1', title: 'Pine Ridge', vintage: 2014, country: 'United States', region: 'Napa Valley', score: 94, review: '', brandName: '',
                description: 'True American. Plain and fair. Doesnt have high alcohol but has good fleshy body. Raisins, tobacco, leather. Deep ruby color. Quite low tannins.',
                image: 'https://s3-eu-west-1.amazonaws.com/decanter-prod-aws1-timeincuk-net/media/images/00000a24c-02-domaine-chataigneraie-laborier-gilles-morat-aux-vignes-dessus-pouilly-fuiss-2013-581730bd4ea60.jpeg'
            },
            {
                id: 'random2', title: 'Estate Merlot', vintage: 2009, country: 'United States', region: 'California', score: 91, review: '', brandName: 'Beringer Vineyards',
                description: 'Lovely big robust dark wine. Oozes spice and purple fruit. Light nose but a very enjoyable drinking wine. Some light smoke which adds to the full flavours in this bottle.',
                image: 'https://s3-eu-west-1.amazonaws.com/decanter-prod-aws1-timeincuk-net/media/images/00000a25a-16-domaine-duroch-les-jeunes-rois-gevrey-chambertin-2013-581730c6671e0.jpeg'
            },
            {
                id: 'random3', title: 'Furth', vintage: 2013, country: 'United States', region: 'Sonoma County', score: 93, review: '', brandName: 'Chalk Hill',
                description: 'The wine is still youthful with vibrant, dark fruit. The tannins have mellowed and are right in the zone. Classic Cabernet profile of dark fruit (cassis) with leather on the finish',
                image: 'https://s3-eu-west-1.amazonaws.com/decanter-prod-aws1-timeincuk-net/media/images/marchand-amp-burch-mount-barrow-pinot-noir-mount-barker-2013-581735a086ef9.jpeg'
            },
            {
                id: 'random4', title: 'Sonoma', vintage: 2004, country: 'United States', region: 'Sonoma County', score: 95, review: '', brandName: 'Seghesio Family Vineyards',
                description: 'You just cant beat this price point. 18 bucks? Drinks like twice the cost. You can impress many a folk with this bottle of Zen.',
                image: 'https://s3-eu-west-1.amazonaws.com/decanter-prod-aws1-timeincuk-net/media/images/000009ef8-brezza-sarmassa-barolo-2010-58173520d217d.jpeg'
            },
        ];


        res.status(constant.SUCCESS).send(wines);
    },

    winePrice: (req, res) => {
        let winePrice = [{
            country: {
                code:"USA",
            },
            currency: {
                symbol:"$"
            },
            price:13.5,
            stockist: {
                name: 'Le Petit Depot'
            }
        }];
        res.status(constant.SUCCESS).send(winePrice);
    },

    winesDetails: (req, res) => {
        let wineDetails = {
            id: req.params.wineId,
            title: 'Pine Ridge',
            vintage: 2014,
            country: 'United States',
            region: 'Napa Valley',
            image: 'https://s3-eu-west-1.amazonaws.com/decanter-prod-aws1-timeincuk-net/media/images/00000a24c-02-domaine-chataigneraie-laborier-gilles-morat-aux-vignes-dessus-pouilly-fuiss-2013-581730bd4ea60.jpeg',
            score: 94,
            review: '',
            description: 'True American. Plain and fair. Doesnt have high alcohol but has good fleshy body. Raisins, tobacco, leather. Deep ruby color. Quite low tannins.',
            brandName: 'Shiraz'
        };
        res.status(constant.SUCCESS).send(wineDetails);
    }
};

module.exports = apiWines;