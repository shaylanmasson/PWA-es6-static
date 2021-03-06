const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Shaylan Masson"});
    }
    render(sPage) {
        const oJson = fetch("https://ux308finalexam-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Stay-at-Home Craft Kits</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <p>${oEntity.kit_date}</p>
            <p>${oEntity.kit_location}</p>
            <p>${oEntity.kit_price}</p>
            <form action="https://stormy-savannah-55988.herokuapp.com/payment" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="${oEntity.kit_price}" />
            <input type="tel" placeholder="enter your number" name="telephone"/>
            <button type="submit">Order now</button>
            </form>
            `;
        });
        return sResult;
    }
}