import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  in: {
    scale: 1.1,
    y: 0,
    x: "100%",
    //filter:"blur(0px)",
    opacity: 0,
    transition: {
      duration: 0.2
    }
  },
  center: {
    x: 0,
    filter:"blur(0px)",
    scale: 1.1,
    opacity: 1,
    transformOrigin: "top",
    transition: {
      duration: 0.2
    }
  },
  scaleUp: {
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      delay: 0.0
    }
  },
  scaleDown: {
    scale: 1.1,
    filter:"blur(10px)",
    y: 0,
    transition: {
      duration: 0.2
    }
  },
  out: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.2,
      delay: 0.0
    }
  }
};

const TransitionEffect3 = ({ children }) => {
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    return (
        <div className="effect-3">
            <AnimatePresence 
                initial={false}
                mode='popLayout'
            >
                <motion.div
                key={router.pathname}
                variants={!shouldReduceMotion ? variants : variants}
                initial="in"
                animate={["center", "scaleUp"]}
                exit={["scaleDown", "out"]}
                className='blurPages'
                id='blurPages'
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TransitionEffect3;
