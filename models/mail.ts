import mongoose,{Schema} from "mongoose";

const MailSchema = new Schema(
    { 
        name : String,
        email:String,
        subject:String,
        details:String 
    },
    {
        timestamps : true,
    }
)
const Email = mongoose.models.Emails || mongoose.model("Emails", MailSchema);

export default Email;