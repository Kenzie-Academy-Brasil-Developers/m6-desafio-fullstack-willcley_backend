import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Contact, Email } from "./index";

@Entity("clients")
export default class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    fullname: string;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @OneToMany(() => Email, (email) => email.client)
    emails: Email[];

    @Column({ type: "json" })
    phones: JSON;

    @OneToMany(() => Contact, (contact) => contact.client)
    contacts: Contact[];
};