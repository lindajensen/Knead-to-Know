const app = Vue.createApp({});

const Home = {
  template: `
  <h1>Knead to Know</h1>

  <article class="article">
    <img src="img/article-img.jpg" alt="Artichokes" />
    <div class="article-content">
      <h2><a href="#">Artichokes: The Crown Jewel of Vegetables</a></h2>
      <p>
        With their elegant layers and earthy flavor, artichokes are a true treasure
        in the culinary world. But don't let their spiky exterior fool you—once you
        master how to prepare them, they're incredibly versatile and rewarding.
        Whether steamed, grilled, or stuffed, artichokes can elevate any meal with
        their unique texture and taste.
      </p>
    </div>
  </article>

  <hr />

  <section class="recent-posts">
    <h2>Recent Posts</h2>
    <div class="post-wrapper">
      <article class="post">
        <img
          src="img/post1-img.jpg"
          alt="Vegetable salad served on black ceramic plate "
        />
        <h3><a href="#">Five Quick Weeknight Dinners</a></h3>
        <p>
          After a long day, cooking shouldn't feel like a chore. These five recipes
          are perfect for busy weeknights—ready in under 30 minutes.
        </p>
      </article>

      <article class="post">
        <img
          src="img/post2-img.jpg"
          alt="Pasta in tomato sauce served on white ceramic plate"
        />
        <h3><a href="#">How to Perfect Homemade Pasta</a></h3>
        <p>
          Nothing beats the satisfaction of making your own pasta. In this
          step-by-step guide, I'll show you how to create silky, delicious pasta
          using just a few simple ingredients.
        </p>
      </article>

      <article class="post">
        <img
          src="img/post3-img.jpg"
          alt="Kale salad served in white ceramic bowl"
        />
        <h3><a href="#">Winter's Best Vegetables!</a></h3>
        <p>
          Embrace the cold months with recipes featuring winter's finest: butternut
          squash, kale, and sweet potatoes.
        </p>
      </article>

      <article class="post">
        <img
          src="img/post4-img.jpg"
          alt="A stack of chocolate chip cookies staacked on a white ceramic plate"
        />
        <h3><a href="#">The Science Behind Perfect Cookies</a></h3>
        <p>
          Ever wondered why your cookies turn out differently every time? This guide
          breaks down the science of baking, helping you troubleshoot and create the
          perfect cookies.
        </p>
      </article>

      <article class="post">
        <img
          src="img/post5-img.jpg"
          alt="Watermelon and feta sald in a white ceramic bowl"
        />
        <h3><a href="#">Building the Ultimate Salad</a></h3>
        <p>
        Salads don't have to be boring! Learn how to create vibrant, flavorful salads that are as satisfying as they are nutritious. From crisp greens to hearty proteins and tangy dressings, we've got all the tips you need to elevate your salad game.
        </p>
      </article>

      <article class="post">
        <img
          src="img/post6-img.jpg"
          alt="Soup in a white ceramic bowl"
        />
        <h3><a href="#">Soups to Soothe the Soul</a></h3>
        <p>
        There's nothing like a warm bowl of soup to bring comfort and nourishment. Discover recipes for every mood—classic chicken noodle, velvety pumpkin bisque, and spicy ramen. Perfect for cozy nights at home!
        </p>
      </article>
    </div>
  </div>

  <hr/>

  <section class="newsletter">
    <div class="newsletter-content">
      <p class="call-to-action">Hungry for more?</p>
      <p>Sign up for my weekly newsletter!</p>
    </div>
    <div class="newletter-input">
      <input
        class="input-field"
        placeholder="Enter your email"
        type="email"
        v-model="email"
      />
      <input class="signup-btn" type="button" value="Sign up" />
    </div>
  </section>
  `,
};

const About = {
  template: `
    <article>
      <h2>About</h2>
      <div class="about-wrapper">
        <img src="img/about-img.jpg" class="about-img" alt="" />

        <section class="about-content">
          <p class="about-text">Hi there! I'm so happy you've stopped by. This site is my personal space to share recipes I love—some passed down from family, others inspired by travels, or born from creative moments in the kitchen. Each recipe is made with care and designed to bring a little joy to your table.</p>
          <p class="about-text">Cooking has always been my favorite way to relax and connect with others. I believe food has a special way of bringing people together, whether it's for a cozy dinner at home or a lively gathering with friends.</p>
          <p class="about-text">Here, you'll find recipes for all skill levels, from comforting classics to exciting new flavors, along with helpful tips to make cooking easier and more fun. My goal is to inspire you to try something new, embrace your creativity, and enjoy the process as much as the results.</p>
          <p class="about-text">So, take a look around, and let's make something delicious together!</p>
          <p class="about-text">Happy cooking,</p>
          <p class="about-text"><span>Ruby</span></p>
        </section>
      </div>
    </article>
  `,
};

const Recipes = {
  data() {
    return {
      recipes: [],
    };
  },
  created() {
    fetch("https://dummyjson.com/recipes")
      .then((response) => response.json())
      .then((result) => {
        this.recipes = result.recipes;
        console.log(result.recipes);
      });
  },
  template: `
    <h2> Recipes </h2>
    <section v-for="recipe in recipes" :key="recipe.id" class="recipe-list">
      <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id }}">
        <h3> {{ recipe.name }}</h3>
        <p class="infoBox">Cooking Time: {{ recipe.cookTimeMinutes }} min</p>
        <p class="infoBox">Difficulty: {{ recipe.difficulty }}</p>
      </router-link>
    </section>
  `,
};

const RecipeDetails = {
  data() {
    return {
      recipe: null,
    };
  },
  created() {
    const recipeId = this.$route.params.id;
    this.fetchRecipe(recipeId);
  },
  watch: {
    "$route.params.id": "fetchRecipe",
  },
  methods: {
    fetchRecipe(id) {
      fetch(`https://dummyjson.com/recipes/${id}`)
        .then((response) => response.json())
        .then((result) => {
          this.recipe = result;
          console.log(result);
        })
        .catch((error) => {
          console.log("Error fetching recipe:", error);
        });
    },
  },
  template: `
    <section class="recipe-container">
      <article class="recipe-wrapper">
        <img :src="recipe.image" :alt="recipe.name">

        <header>
          <h2 class="recipe-heading"> {{ recipe.name }}</h2>
        </header>

        <section class="serving-details">
          <p><span>Servings</span>: {{ recipe.servings }}</p>
          <p><span>Calories</span>: {{ recipe.caloriesPerServing }}</p>
        </section>

        <h3>Ingredients</h3>
        <section class="recipe-details">
          <ul>
            <li class="ingredient-list" v-for="ingredient in recipe.ingredients">
              {{ ingredient }}
            </li>
          </ul>
        </section>

        <h3>Instructions</h3>
        <section class="recipe-details">
          <ol>
              <li class="instructions" v-for="instruction in recipe.instructions">
                {{ instruction }}
              </li>
          </ol>
        </section>

        <section class="tags">
          <ul>
            <li v-for="tag in recipe.tags">
              {{ tag }}
            </li>
          </ul>
        </section>
        <hr />
      </article>

      <aside class="aside">
        <h2>Welcome to Knead to Know</h2>
        <p>Your one-stop site for delicious inspiration!</p>

        <section class="popular-recipes">
          <h3>Popular Recipes</h3>
          <ul>
            <li>
              <router-link to="/recipes/3">Chocolate Chip Cookies</router-link>
            </li>
            <li>
              <router-link to="/recipes/4">Chicken Alfredo</router-link>
            </li>
            <li>
              <router-link to="/recipes/23">Italian Tiramisu</router-link>
            </li>
          </ul>
        </section>

        <hr />

        <section class="newsletter">
          <div class="newsletter-content">
            <p class="call-to-action">Hungry  for more?</p>
            <p>Sign up for my weekly newsletter!</p>
          </div>

          <div class="newletter-input">
            <input
              class="input-field"
              placeholder="Enter your email"
              type="email"
              v-model="email"
            />
            <input class="signup-btn" type="button" value="Sign up" />
          </div>
        </section>
      </aside>
    </section>
  `,
};

const NotFound = {};

const routes = [
  {
    component: Home,
    name: "Home",
    path: "/",
  },
  {
    component: About,
    name: "About",
    path: "/about",
  },
  {
    component: Recipes,
    name: "Recipes",
    path: "/recipes",
  },
  {
    component: RecipeDetails,
    name: "RecipeDetails",
    path: "/recipes/:id",
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

app.use(router);
app.mount("#app");
