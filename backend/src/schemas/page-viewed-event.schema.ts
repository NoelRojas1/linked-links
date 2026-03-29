import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PageViewedEvent {
  kind: string;
  time: Date;
}

export const ClickedLinkEventSchema =
  SchemaFactory.createForClass(PageViewedEvent);
