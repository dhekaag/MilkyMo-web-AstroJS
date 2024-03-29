import { e as createAstro, f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from '../astro_khQyWLKJ.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './home_Bv7ckQxg.mjs';
/* empty css                          */

const $$Astro = createAstro("https://example.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  if (Astro2.request.method === "POST") {
    const formData = await Astro2.request.formData();
    const id_peternak = formData.get("userId");
    const password = formData.get("password");
    const data = { id_peternak, password };
    console.log(`userId: ${id_peternak} password : ${password}`);
    const server_url = "https://milkymo-backend.vercel.app/";
    try {
      const response = await fetch(server_url + "users/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json"
        }
      });
      console.log("response status : " + response.status);
      if (response.status === 200) {
        return Astro2.redirect("/home");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "milkymo", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container" data-astro-cid-j7pv25f6> <!-- <div class="brand-logo"></div> --> <div class="brand-title" data-astro-cid-j7pv25f6>MILKYMO</div> <div class="inputs" data-astro-cid-j7pv25f6> <form method="POST" data-astro-cid-j7pv25f6> <label data-astro-cid-j7pv25f6>ID PETERNAK</label> <input type="text" name="userId" placeholder="Masukkan id peternak" data-astro-cid-j7pv25f6> <label data-astro-cid-j7pv25f6>PASSWORD</label> <input type="password" name="password" placeholder="Masukkan password" data-astro-cid-j7pv25f6> <button type="submit" data-astro-cid-j7pv25f6>LOGIN</button> </form> </div> </div>  ` })}`;
}, "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/pages/index.astro", void 0);
const $$file = "C:/Users/Agungdk/Desktop/milkymo-admin/frontend-admin/astro-frontend/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
