import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from "uuid"

@Entity()
export class Users {

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    age: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}