import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn }
from "typeorm";
import {hashSync, genSaltSync} from "bcrypt-nodejs"
import {v4 as uuid} from "uuid"

@Entity()
export class Users {

    @PrimaryColumn()
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    age: number;

    @Column({nullable: false})
    password: string;

    @Column({default: false})
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @BeforeInsert()
    hashPassword(){
        const salt = genSaltSync(10)
        this.password = hashSync(this.password, salt)
    }

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}
