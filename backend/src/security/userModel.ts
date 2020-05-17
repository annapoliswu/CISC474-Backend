import bcrypt from 'bcrypt';

//represents a user in the system
export class UserModel{
    id?='';
    email = '';
    private _password='';
    favorites:Array<string> = []; //["test", "5eb5a1fbe2e28b1d9c2aafc2"]

    //when user password is set through here, it is stored encrypted
    set password(val:string){
        this._password=UserModel.encryptString(val);
    }
    //returns encrypted password
    get password():string{return this._password;}

    

    //encrypts password
    public constructor(email:string,password:string,favorites:Array<string>){
        this.email=email;
        this.password=password;
        this.favorites = favorites;
    }

    //does not encrypt password, expects already encrypted password
    static fromObject=(obj:any):UserModel=>{
        const mdl=new UserModel(obj.email,'',obj.favorites);
        mdl._password=obj.password;
        return mdl;
    }

    //includes encrypted password
    toObject=(): any=> ({email: this.email,password: this.password, favorites: this.favorites});

    //compares unencrypted password to encrypted password
    validatePassword(password:string):boolean{
        if (this.password==='*') {return false;}
        return bcrypt.compareSync(password,this.password);
    }
    
    //encrypt a string using the bcrypt library
    static encryptString(inval:string):string{
        try {
            var salt  = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(inval, salt);
        }catch (err){
            return '*';
        }
    }
}