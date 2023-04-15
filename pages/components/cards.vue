<script lang="ts" setup>
import {CardProps} from "~";
import Divider from "~/components/Divider/Divider.vue";
import Button from "~/components/Button/Button.vue";

const cardTypes = ["elevated", "filled", "outlined"];

const headlines = [
  "The Best Tacos in Town",
  "Discover the Magic of Bali",
  "Summer Sale - Up to 50% Off",
  "New Collection - Stay Ahead of the Trend",
  "Unleash Your Inner Chef",
  "Explore the City Like a Local",
  "Luxury Beach Resort - Your Dream Vacation",
  "Stay Fit and Healthy with Our Gym Membership",
  "Transform Your Home with Our Interior Design Services",
  "Experience the Thrill of Skydiving",
  "Get Your Perfect Smile - Visit Our Dental Clinic",
];

const supportingTexts = [
  "Our tacos are made with the freshest ingredients and packed with flavor. Come try them out!",
  "Experience the natural beauty and rich culture of Bali on your next vacation.",
  "Don't miss out on our biggest sale of the year. Limited time only!",
  "Stay ahead of the trend with our latest collection of clothing and accessories.",
  "Take your cooking skills to the next level with our cooking classes.",
  "Discover hidden gems and secret spots in the city with our expert guides.",
  "Relax and unwind at our luxury beach resort, complete with stunning ocean views and top-notch amenities.",
  "Stay fit and healthy with our state-of-the-art gym equipment and personal training sessions.",
  "Transform your home into a beautiful and functional space with the help of our expert designers.",
  "Experience the ultimate adrenaline rush with our skydiving adventure.",
  "Get the perfect smile you've always wanted with our comprehensive dental services.",
];

const subheads = [
  "Tacos",
  "Bali",
  "Summer Sale",
  "New Collection",
  "Cooking Classes",
  "City Tours",
  "Luxury Resort",
  "Gym Membership",
  "Interior Design",
  "Skydiving",
  "Dental Clinic",
];

const images = [
  "/wallpapers/wallpaper.webp",
];

const getRandomHeadline = () => headlines[Math.floor(Math.random() * headlines.length)];
const getRandomImage = () => Math.random() < 0.7 ? images[Math.floor(Math.random() * images.length)] : undefined;
const getRandomSubhead = () => Math.random() < 0.8 ? subheads[Math.floor(Math.random() * subheads.length)] : undefined;
const getRandomType = () => cardTypes[Math.floor(Math.random() * cardTypes.length)] as CardProps["type"];
const getRandomSupportingText = () => supportingTexts[Math.floor(Math.random() * supportingTexts.length)];

const getLengthySupportingText = () => {
  const text = getRandomSupportingText();
  return Array.from({length: 10}, () => text).join(" ");
};

const generateCardData = (): CardProps => ({
  type: getRandomType(),
  headline: getRandomHeadline(),
  subhead: getRandomSubhead(),
  supportingText: getLengthySupportingText(),
  image: getRandomImage(),
});

const generate = (length = 10): CardProps[] => Array.from({length}, generateCardData);

const cardData = useState(() => {
  const d = generate(10);
  console.log(d);
  return d;
})

</script>

<template>
  <div class="flex flex-col">

    <Divider/>
    <div class="grid gap-4 overflow-y-auto p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card class="p-3">
        <h2 class="mb-1 text-xl font-bold">
          Card with no props
        </h2>
        <p class="text-sm font-semibold mb-2">
          The subhead
        </p>
        <p class="text-sm text-on-surface-variant">
          This card has no props, so it will use the default values.
        </p>
        <Button
            class="mt-2"
            data-role="button"
            intent="filled"
            size="small"
        >
          Action
        </Button>
      </Card>
    </div>
  </div>
</template>
