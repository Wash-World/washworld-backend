import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Membership } from '../../memberships/entities/membership.entity';
import { Favourite } from '../../favourites/entities/favourite.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  mobile_num: string;

  @Column({ nullable: true })
  carplate: string;

  // ← new relation to Membership
  @ManyToOne(() => Membership, { eager: true }) //eager: true loads the membership automatically when you fetch a user.
  @JoinColumn({ name: 'membership_id' }) //The membership_id foreign-key column is created for you.
  membership: Membership;

  //This doesn’t create a new column in users; it simply tells TypeORM “when you load a user,
  //you can fill in an array of the related Favourite rows from favourite_locations.”
  @OneToMany(() => Favourite, (fav) => fav.user, { cascade: true }) // lets you save new Favourite objects by pushing them into user.favourites and calling save(user).
  favourites: Favourite[];
}
