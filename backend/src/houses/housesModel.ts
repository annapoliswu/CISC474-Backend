
export class HousesModel{
    id='';
    title='';
    description = '';
    street = '';
    city = '';
    state = '';
    zip = '';
    price = '';
    bedrooms = '';
    bathrooms = '';
    sqfeet = '';
    contactemail = '';
    contactphone = '';
    photos = [];
    lat = null;
    long = null;

    //basically make new HouseModel and this.title = req.body.title?
    static fromObject(object:any):HousesModel{
        const h : HousesModel = new HousesModel();
        h.title = object.title;
        h.description = object.description;
        h.street = object.street;
        h.state = object.state;
        h.city = object.city;
        h.zip = object.zip;
        h.price = object.price;
        h.bedrooms = object.bedrooms;
        h.bathrooms = object.bathrooms;
        h.sqfeet = object.sqfeet;
        h.contactemail = object.contactemail;
        h.contactphone = object.contactphone;
        h.photos = object.photos;
        h.lat = object.lat;
        h.long = object.long;
        return h;
    }
    
    toObject():any{
        return {
            title: this.title, 
            description: this.description,
            street: this.street,
            state: this.state,
            city: this.city,
            zip: this.zip,
            price: this.price,
            bedrooms: this.bedrooms,
            bathrooms: this.bathrooms,
            sqfeet: this.sqfeet,
            contactemail: this.contactemail,
            contactphone: this.contactphone,
            photos: this.photos,
            lat: this.lat,
            long: this.long,
            };
    }
}