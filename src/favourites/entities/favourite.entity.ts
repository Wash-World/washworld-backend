import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('favourite_locations')
@Unique(['user', 'location_api_id']) //Prevents the same user picking the same location twice.
export class Favourite {
  @PrimaryGeneratedColumn()
  fav_location_id: number;

  // The user who bookmarked this location
  @ManyToOne(() => User, (user) => user.favourites, {
    onDelete: 'CASCADE', //will automatically remove bookmarks if the user is deleted.
    eager: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // The ID we get from the external locations API
  @Column()
  location_api_id: string;
}
