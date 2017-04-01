var flavors = [
  "Only a few days left to make a tax-deductable contribution to keep your node_modules huge. Please help pay our bills.",
  "Take me to flavortown!",
  "Null is actually my middle name. (•_•) ( •_•)>⌐■-■ (⌐■_■)",
  "A personal appeal from the mayor of Flavortown.",
  "If everyone reading this donated $5 our fundraiser would be over today. Donate to keep all your modules transpiled for free.",
  "Always bet on JS",
  "Imagine you had a nickel for every time Babel transpiled your code. We need those nickels.",
  "We're almost to Flavortown. Thank you.",
  "Remember arguments.callee? Man, what was that about.",
  "I Peeked Into My Node_Modules Directory And You Won’t Believe What Happened Next",
  "Wham! Bam! Hickory Ham! #HotPockets",
  "Each installation of Babel includes a picture of Guy Fieri, and there is nothing you can do about it.",
  "if (!flavortown) throw 'up'",
  // Guy quotes
  "Short of screaming-hot Thai food, everything can be suitable for kids too.",
  "There are two different things: there's grilling, and there's barbecue. Grilling is when people say, 'We're going to turn up the heat, make it really hot and sear a steak, sear a burger, cook a chicken.' Barbecue is going low and slow.",
  "Some people are just born to cook and talk. And transpile code.",
  "I'm a five-seasons griller! Did you know I added a new season? Living in Cali, I'm cooking in the yard all the time. I don't care what the weather is like. My hair is impervious to any kind of dampness, so I don't have too much to worry about.",
  "No matter how tough the meat may be, it's going to be tender if you slice it thin enough.",
  "There's nothing that can replicate the smoky flavor of char, so when I've got the hankering for it, I tell my wife that I'm taking care of dinner. I have three different types of barbecues - a coal, gas and smoker - so I can experiment a lot.",
  "If you're cooking and not making mistakes, you're not playing outside your safety zone. I don't expect it all to be good. I have fat dogs because I scrap that stuff out the back door.",
  "I think anyone that grew up in the '70s and '80s grew up with Bob Barker and Wink Martindale and I think that was just always... when you were a game show host, you were the man of the hour.",
  "You don't have to eat a whole cheeseburger, just take a piece of the cheeseburger.",
  "Liver is my number one most hated food. Oh, God, I get sick talking about it!",
  "I'm a big fan of doing 'Triple D.' But I don't want to do it forever, don't get me wrong! Travel away from my family, are you crazy? But do you know what it does for these mom-and-pop restaurant joints? It changes their lives forever. I mean, their businesses will never be the same.",
  "What you see is what you get with me. There's no show.",
  "I'm not a greasy food guy. I don't eat like that.",
  "There's been quite a few conversations between me and my wife; she'd like to see my hair brown again. So who knows what will happen.",
  "If you've really got a problem with me, and you came and told me you had a problem with me, I'd be interested to listen to you. But if you're just some loser that sits there and hammers away on some blog form or whatever, I don't have time for that. Why even worry about it?",
  "My spiked hair goes back about 15 years ago. I had long, curly rocker hair then. The woman who cuts my hair thought I needed a new style, so I let her surprise me. I flipped when I first saw it, but I soon realized the look was really me. I've always been a little crazy.",
  "I love to exercise. I'm a big hiker, and I like boxing. I mean, I love a good burger, but I keep things in moderation.",
  "I'm a big greens fan. I'm a big vegetable fan. I'm a big whole grains fan. And I exercise a lot. That's how I keep this petite dancer's figure.",
  "One of the greatest birds I've ever had is called a 'Turducken.' A chicken inside of a duck inside of a turkey. That's one that I love. I've done it a couple times.",
  "I've been using the same hair wax for as long as I can remember. I'm not a gel guy, I'm not a perfume guy, not really into any of that.",
  "The last thing I'm gonna do is, 'This is dynamite!' That's not my gig, man. I love the mom-and-pop joints. I love giving them recognition, but I'm not gonna blow smoke. We walked out of locations; we've changed locations.",
  "I did a big thing with Ritz Crackers - great cracker. Am I now the Ritz chef? No! Do I think the cracker has a lot of diversity and appeal? Yeah! Does it mean that's my foundation of cooking? No!",
  "I take everything very seriously, but I also take it lighthearted to recognize that you can't control it.",
  "There are three people you need in life: an accountant, a fishmonger, and a bail bondsman.",
  "Triple D is all about three things: Food, story and character.",
  "I need to stay disciplined on the road. Too much food can wreck your palate.",
  "I've always been an eccentric, a rocker at heart. I can't play the guitar, but I can play the griddle.",
  "I am just a regular dude who happened to make it. That's all I am, man. Maybe I was preparing myself in some lifetime to become this person, but I never thought I'd have every rocket shooting off at one time.",
  "If you are AC/DC, you don't get credit for slow songs. And if you are doing a show about food with a blond dude with crazy blond hair and tattoos who drives a hot rod, of course everyone is going to think everything you eat is deep-fried.",
  "I have a fond appreciation for the Canadian culture and the Canadian food scene in general.",
  "I wake up in the morning thinking about food.",
  "I never knew I would go this far, but I was told by people it wouldn't happen, and now I own four restaurants, and I have one of the best shows on the Food Network. I'm living in the Super Bowl of food.",
  "The Tom Brady sandwich would be a prosciutto with a nice Buffalo mozzarella, on a crispy baguette with a little fresh basil. Brady is classy; he's a really cool dude. He's got a lot of flavor.",
  "You can find tranquility, you can find party, you can find new friends. I'm a cruise convert.",
  "No one likes rubbery chicken.",
  "Ripe avocados should be soft, not squishy, and you should be able to flick the little stem off easily.",
  "I look at a basketball laying on the ground, and it makes me think of something. Popcorn ball. How 'bout a spicy popcorn ball? That is how my mind is always working.",
  "With messy food, or foods with a lot of sauce, you do 'The Hunch.' I learned it in Philly, watching the dudes in suits eat cheesesteaks. You keep your elbows above your hands because if you don't, the grease runs down your sleeve to your elbow.",
  "If you looked in my fridge, you'd see maybe 12 different mustards.",
  "If it tastes really good, and it's funky, it's funkalicous. If the guy making it is funky, he's funkintacious.",
  "'Triple D' is not going anywhere. I enjoy highlighting my brothers and sisters in the business.",
  "I'm a stocky 210 pounds.",
  "I'm a collector, so I've got all kinds of sunglasses. I'd say I've got about a buck ten, buck twenty.",
  "What do people want? Contact. People want to be able to see you and touch you. Are you real?",
  "The No. 1 thing I hear from people when I meet them in the airport is, 'Oh my gosh, you're just like you are on TV.' Well, I'm not an actor. I don't think anyone could figure out how to be this weird.",
  "I've never been an apron fan; it's all too cumbersome to me.",
  "I'm a huge kale fan.",
  "I don't eat sweets. I'm not a big dessert guy.",
  "Why can't we have a concert with food? Your typical cooking demonstration, there's just no enthusiasm. There's no energy behind it. I said, 'What if we take a cooking demonstration and fortify it with a lot of good music? ... Drive it to the next level?'",
  "Howie Mandel is the real deal.",
  "I'm a culinary gangsta with a very spiritual side, so when I was introduced to the 'spiritual gangster' line, I had to have it.",
  "I was even more of a Hagar fan when he was just Hagar and not Van Hagar.",
  "If I probably didn't have tattoos, or if I probably didn't bleach my hair, or if I probably didn't wear blue jeans and a T-shirt to fancy things, if I didn't do things that make me look like someone who's whacked out of their mind, it'd probably be different. But then again, that's how I wanna dress.",
  "I'm like anybody else. You get enough, you can get beat up. You can get hurt. You can get frustrated. You can get demoralized.",
  "I cannot get enough farro.",
  "I'm gonna open a small restaurant on the beach in Mexico. We're only gonna have a few tables, and we're only gonna cook what's fresh that day. We're gonna get back to the basics... Real food for real people.",
  "If you're feeling adventurous, grill up some marinated octopus. It's so healthy.",
  "I'm a big hiker, and I like boxing. I mean, I love a good burger, but I keep things in moderation.",
  "One of my good buddies is Marcel Reece with the Raiders. He's a big 'Triple-D' fan; he's a big food fan.",
  "One of my good buddies is Steve Hutchinson. He used to play for the Vikings, and he's also been on 'Triple-D.'",
  "Look, the fame rocket is only on the upward trajectory for a limited time.",
  "I would ride my horse to school.",
  "I love everything from Enya to Pantera.",
  "As soon as you wanna take away the flavor of anything, just fry it."
];

document.addEventListener("DOMContentLoaded", function() {
  // Some people are just born to cook and talk.
  var $appeal = document.getElementById('fieri_quote');
  var textFitOptions = {
    maxFontSize: 16,
    multiLine: true
  }
  textFitIt();

  setInterval(function() {
    takeMeToFlavorTown(flavors[Math.floor(Math.random() * flavors.length)]);
  }, 5000);

  function takeMeToFlavorTown(msg) {
    $appeal.className = "animating";
    setTimeout(function() {
      $appeal.innerHTML = msg;
      textFitIt();
    }, 500);
    setTimeout(function() {
      $appeal.className = '';
    }, 1000);
  }

  function textFitIt() {
    var textFitOptions = {
      maxFontSize: Math.max(16, Math.floor(window.innerWidth / 50)),
      multiLine: true
    }
    requestAnimationFrame(function() {
      window.textFit($appeal, textFitOptions);
    });
  }
});
