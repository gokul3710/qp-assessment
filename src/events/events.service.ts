import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActivityEmitter } from './events.emitter';
import { Events } from 'src/common/constants/events';
import { Event } from './events.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    private readonly userActivityEmitter: UserActivityEmitter
  ) { }

  onModuleInit() {
    this.userActivityEmitter.on(Events.USER_SIGNUP, (activity) => {
      this.logEvent(Events.USER_SIGNUP, activity);
    });

    this.userActivityEmitter.on(Events.PRODUCT_CREATE, (activity) => { 
      this.logEvent(Events.PRODUCT_CREATE, activity);
    });

    this.userActivityEmitter.on(Events.PRODUCT_UPDATE, (activity) => { 
      this.logEvent(Events.PRODUCT_UPDATE, activity);
    });

    this.userActivityEmitter.on(Events.PRODUCT_DELETE, (activity) => { 
      this.logEvent(Events.PRODUCT_DELETE, activity);
    });

    this.userActivityEmitter.on(Events.ORDER_CREATE, (activity) => { 
      this.logEvent(Events.ORDER_CREATE, activity);
    });
  }

  async logEvent(type: Events, payload: any) {
    try {
      const date = new Date();
      const newEvent = this.eventRepository.create({ type, metadata: JSON.stringify(payload), createdAt: date, updatedAt: date });
      return await this.eventRepository.save(newEvent);
    } catch (err) {
      throw new Error(err);
    }
  }
}
