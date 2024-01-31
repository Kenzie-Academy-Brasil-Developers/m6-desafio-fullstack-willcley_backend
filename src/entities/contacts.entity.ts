import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Client } from "./index";

@Entity("contacts")
export default class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50 })
    fullname: string;

    @CreateDateColumn({ type: "date" })
    createdAt: string;

    @Column({ type: "json" })
    emails: JSON;

    @Column({ type: "json" })
    phones: JSON;

    @ManyToOne(() => Client, (client) => client.contacts, {
        onDelete: "CASCADE",
    })
    client: Client;
};