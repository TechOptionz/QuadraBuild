/** Runs in <head> before first paint: plays the logo intro once per session, never for reduced motion. */
export const INTRO_KEY = "qb-intro-seen";

export const INTRO_HEAD_SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem("${INTRO_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-skip")}else{sessionStorage.setItem("${INTRO_KEY}","1");d.classList.add("intro-playing")}}catch(e){document.documentElement.classList.add("intro-playing")}`;
