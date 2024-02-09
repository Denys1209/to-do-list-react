export default class ListOfDeals {
 constructor(title, deals) {
    this.title = title;
    this.deals = deals;
 }

 // Method to add a deal to the project
 addDeal = (dealId) => {
    this.deals.push(dealId);
 };

 // Method to remove a deal from the project
 removeDeal = (dealId) => {
    this.deals = this.deals.filter(deal => deal.id !== dealId);
 };
}
