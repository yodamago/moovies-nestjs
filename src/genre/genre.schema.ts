import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Genre extends Document {
  @Prop({ type: String, required: true })
  name: string;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
