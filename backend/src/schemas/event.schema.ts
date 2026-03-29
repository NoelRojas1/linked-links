import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClickedLinkEvent } from './clicked-link-event.schema';
import { PageViewedEvent } from './page-viewed-event.schema';

@Schema({ discriminatorKey: 'kind' })
export class Event {
  @Prop({
    type: String,
    required: true,
    enum: [ClickedLinkEvent.name, PageViewedEvent.name],
  })
  kind: string;

  @Prop({ type: Date, required: true })
  date: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
