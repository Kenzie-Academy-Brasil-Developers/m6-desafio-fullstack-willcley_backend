import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Client } from "./index";

@Entity("emails")
export class Email {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 50, unique: true })
    email: string;

    @Column({ length: 120 })
    password: string;

    @ManyToOne(() => Client, (client) => client.emails)
    client: Client;
};