import { getRounds, hashSync } from "bcryptjs";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
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

    @ManyToOne(() => Client, (client) => client.emails, {
        onDelete: "CASCADE",
    })
    client: Client;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const hasRounds: number = getRounds(this.password)

        if (!hasRounds) {
            this.password = hashSync(this.password, 10);
        };
    };
};