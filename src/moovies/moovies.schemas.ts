import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Moovies extends Document {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: Date, required: true })
  releaseDate: Date;

  @Prop({ type: Array, required: true })
  genre: [string];
}

export const MooviesSchema = SchemaFactory.createForClass(Moovies);
