import Sinon, { spy } from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';

import createPushNotificationsJobs from './8-job';

let queue;
let consoleLogSpy;

describe('createPushNotificationsJobs', () => {
  before(() => {
    queue = createQueue();
    queue.testMode.enter();
  });

  beforeEach(() => {
    consoleLogSpy = spy(console, 'log');
    queue.testMode.clear(); // Ensure that we have a clean slate
  });

  after(() => {
    queue.testMode.exit();
  });

  afterEach(() => {
    consoleLogSpy.restore();
  });

  it('display a error message if jobs is not an array', () => {
    expect(() => {
      createPushNotificationsJobs('jobs', queue);
    }).to.throw('Jobs is not an array');
  });

  it('create two new jobs to the queue', () => {
    const list = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account',
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 4562 to verify your account',
      },
    ];

    createPushNotificationsJobs(list, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql(list[0]);
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.eql(list[1]);
  });

  it('should log the job id when new job is created', () => {
    createPushNotificationsJobs(
      [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account',
        },
      ],
      queue
    );

    expect(consoleLogSpy.calledOnce).to.be.true;
    expect(
      consoleLogSpy.calledWith(
        `Notification job created: ${queue.testMode.jobs[0].id}`
      )
    ).to.be.true;
  });

  it('should log the job id when job is complete', () => {
    createPushNotificationsJobs(
      [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account',
        },
      ],
      queue
    );

    queue.testMode.jobs[0].emit('complete');

    expect(consoleLogSpy.calledTwice).to.be.true;
    expect(
      consoleLogSpy.calledWith(
        `Notification job ${queue.testMode.jobs[0].id} completed`
      )
    ).to.be.true;
  });

  it('should log the error when a job failed', () => {
    createPushNotificationsJobs(
      [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account',
        },
      ],
      queue
    );

    queue.testMode.jobs[0].emit('failed');

    expect(consoleLogSpy.calledTwice).to.be.true;
    expect(
      consoleLogSpy.calledWith(
        `Notification job ${queue.testMode.jobs[0].id} failed: undefined`
      )
    ).to.be.true;
  });

  it('should log the progress when a job is being executed', () => {
    createPushNotificationsJobs(
      [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account',
        },
      ],
      queue
    );

    queue.testMode.jobs[0].emit('progress');

    expect(consoleLogSpy.calledTwice).to.be.true;
    expect(
      consoleLogSpy.calledWith(
        `Notification job ${queue.testMode.jobs[0].id} 0% complete`
      )
    ).to.be.true;
  });
});
