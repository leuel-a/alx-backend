import { createQueue } from 'kue';

const blacklistedPhoneNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
  if (blacklistedPhoneNumbers.find((numbers) => numbers === phoneNumber)) {
    console.log('found the number');
    done(Error(`Phone number ${phoneNumber} is blacklisted`));
  }

  for (let i = 0; i <= 50; i = i + 50) {
    job.progress(i, 100);
  }
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
  done();
}

const queue = createQueue();

queue.process('push_notification_code_2', 2, (job, done) => {
  const { phoneNumber, message } = job.data;
  sendNotification(phoneNumber, message, job, done);
});
