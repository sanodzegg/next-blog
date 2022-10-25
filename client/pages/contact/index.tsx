import { NextPage } from "next";
import Form from "../../components/contact/form/ContactForm";
import useSessionStorage from "../../hooks/useSessionStorage";
import classes from "./Contact.module.css";

const Contact:NextPage = () => {
    const data = useSessionStorage("contactMail");
    let empty;

    if(data) {
        empty = JSON.parse(data);
    }

    return (
        <div className={classes.contactWrapper}>
            <h1>Let&apos;s Chat</h1>
            <p>we are always happy to hear from you.</p>
            <Form sessionData={empty} />
        </div>
    );
}

export default Contact;