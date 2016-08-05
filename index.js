const Twit = require('twit');

/*
  HEY

  YA U

  Rename config.sample.js to conig.js

  k
*/
const config = require('./config');
const T = new Twit(config);

const niceThingsToSay = [
  'It\'s Operator Mono! He wrote a little more about his setup at http://WesBos.com/uses',
  'Hey There! Operator Mono is the name of that game http://WesBos.com/uses',
  'Operator Mono! http://WesBos.com/uses',
  'At your service! It\'s operator mono! http://WesBos.com/uses',
  'wait for it................  operator mono! → → → →  http://WesBos.com/uses',
  'Hey! check out http://WesBos.com/uses - it\'s Operator Mono',
];

const funEmojis = ['👊','🔥','👍','🎉','💁','🙃','🍕','😎','😘','👏','✌️','👌','👈','👙','🐷','🍟'];

function buildTweet() {
  // get a random emoji
  const emoji = funEmojis[Math.floor(Math.random() * funEmojis.length)];
  // get a random sentence
  const sentence = niceThingsToSay[Math.floor(Math.random() * niceThingsToSay.length)];
  return `${sentence} ${emoji}`;
}

const stream = T.stream('statuses/filter', { track: 'wesbos font' });

stream.on('tweet', (tweet) => {
  console.log(tweet);
  const createdTweet = {
    status: `@${tweet.user.screen_name} ${buildTweet()}`,
    in_reply_to_status_id: tweet.id_str
  };
  T.post('statuses/update', createdTweet, (err, response) => {
    console.log(response);
  });
});
