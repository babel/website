var flavors = [
  "We're on Open Collective!",
  "Take me to flavortown!",
  "Null is actually my middle name.\n(•_•) ( •_•)>⌐■-■ (⌐■_■)",
  "A personal appeal from the mayor of Flavortown.",
  "If everyone reading this donated $5 our fundraiser would be over today. Donate to keep all your modules transpiled for free.",
  "Always bet on JS.",
  "Imagine you had a nickel for every time Babel transpiled your code. We need those nickels.",
  "We're almost to Flavortown. Thank you.",
  "Remember arguments.caller? Man, what was that about.",
  "I Peeked Into My Node_Modules Directory And You Won’t Believe What Happened Next!",
  "Wham! Bam! Hickory Ham! #HotPockets",
  "Each installation of Babel includes a picture of Guy Fieri, and there is nothing you can do about it.",
  "if (!flavortown) throw 'up'",
  "In the UK, they call it \"flavourtown\".",
  "export const guy = [ <redacted> ]",
  "Babel 7 Changelog: \"Remove Guy Fieri\"",
  "This would break my code that relies on being taken to flavortown.",
  // Guy quotes
  "Short of screaming-hot Thai food, everything can be suitable for kids too.",
  "Some people are just born to cook and talk. And transpile code.",
  "Liver is my number one most hated food. Oh, God, I get sick talking about it!",
  "What you see is what you get with me. There's no show.",
  "I'm not a greasy food guy. I don't eat like that.",
  "My spiked hair goes back about 15 years ago. I had long, curly rocker hair then. The woman who cuts my hair thought I needed a new style, so I let her surprise me. I flipped when I first saw it, but I soon realized the look was really me. I've always been a little crazy.",
  "One of the greatest birds I've ever had is called a 'Turducken.' A chicken inside of a duck inside of a turkey. That's one that I love. I've done it a couple times.",
  "I've been using the same hair wax for as long as I can remember. I'm not a gel guy, I'm not a perfume guy, not really into any of that.",
  "The last thing I'm gonna do is, 'This is dynamite!' That's not my gig, man. I love the mom-and-pop joints. I love giving them recognition, but I'm not gonna blow smoke. We walked out of locations; we've changed locations.",
  "There are three people you need in life: an accountant, a fishmonger, and a bail bondsman.",
  "No one likes rubbery chicken.",
  "I look at a basketball laying on the ground, and it makes me think of something. Popcorn ball. How 'bout a spicy popcorn ball? That is how my mind is always working.",
  "If it tastes really good, and it's funky, it's funkalicous. If the guy making it is funky, he's funkintacious.",
  "I'm a stocky 210 pounds.",
  "I'm a collector, so I've got all kinds of sunglasses. I'd say I've got about a buck ten, buck twenty.",
  "The No. 1 thing I hear from people when I meet them in the airport is, 'Oh my gosh, you're just like you are on TV.' Well, I'm not an actor. I don't think anyone could figure out how to be this weird.",
  "I'm a huge kale fan.",
  "Howie Mandel is the real deal.",
  "I'm a culinary gangsta with a very spiritual side, so when I was introduced to the 'spiritual gangster' line, I had to have it.",
  "If I probably didn't have tattoos, or if I probably didn't bleach my hair, or if I probably didn't wear blue jeans and a T-shirt to fancy things, if I didn't do things that make me look like someone who's whacked out of their mind, it'd probably be different. But then again, that's how I wanna dress.",
  "Look, the fame rocket is only on the upward trajectory for a limited time.",
  "I would ride my horse to school.",
  "I love everything from Enya to Pantera.",
];

document.addEventListener("DOMContentLoaded", function() {
  // Some people are just born to cook and talk.
  var $appeal = document.getElementById('fieri_quote');
  var textFitOptions = {
    maxFontSize: 16,
    multiLine: true
  }
  textFitIt();
  var shuffledFlavors = shuffle(flavors.slice());
  var i = 0;

  setInterval(function() {
    if (i >= shuffledFlavors.length) {
      // Re-shuffle
      shuffledFlavors = shuffle(flavors.slice());
      i = 0;
    }
    takeMeToFlavorTown(shuffledFlavors[i++]);
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

  function shuffle(arr) {
    var counter = arr.length;

    while (counter > 0) {
      var i = Math.floor(Math.random() * counter);
      counter--;
      // Man, if only we had some kind of destructuring syntax for swapping
      var temp = arr[counter];
      arr[counter] = arr[i];
      arr[i] = temp;
    }

    return arr;
  }
});
