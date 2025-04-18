import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "../../context/Context";
import { assets } from "../../assets/assets";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSent();
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const cardHover = {
    scale: 1.05,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <motion.div 
      className="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="nav"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <p>ChatSphere</p>
        <motion.img 
          src={assets.user_icon} 
          alt=""
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </motion.div>
      <div className="main-container w-full max-w-5xl mx-auto h-full flex flex-col px-4">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="greeting"
              {...fadeIn}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="greet"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p>
                  <span>Hello, Boss</span>
                </p>
                <p>How Can I Help you today?</p>
              </motion.div>
              
              <div className="cards grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    text: "Suggest beautiful places to see on an upcoming road trip",
                    icon: assets.compass_icon
                  },
                  {
                    text: "Briefly summarize this concept: urban planning",
                    icon: assets.bulb_icon
                  },
                  {
                    text: "Brainstorm team bonding activities for our work retreat",
                    icon: assets.message_icon
                  },
                  {
                    text: "Improve the readability of the following code",
                    icon: assets.code_icon
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    className="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={cardHover}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p>{card.text}</p>
                    <motion.img 
                      src={card.icon} 
                      alt=""
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="result"
              key="result"
              {...fadeIn}
            >
              <motion.div 
                className="result-title"
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                <img src={assets.user_icon} alt="" />
                <p className="break-words">{recentPrompt}</p>
              </motion.div>
              <motion.div 
                className="result-data"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <img src={assets.gemini_icon} alt="" />
                {loading ? (
                  <motion.div 
                    className="loader"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <hr />
                    <hr />
                    <hr />
                  </motion.div>
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="main-bottom mt-4"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.div 
            className="search-box"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <input
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <motion.img 
                src={assets.gallery_icon} 
                alt=""
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.img 
                src={assets.mic_icon} 
                alt=""
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
              {input && (
                <motion.img 
                  onClick={onSent}
                  src={assets.send_icon} 
                  alt=""
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              )}
            </div>
          </motion.div>
          <motion.div 
            className="bottom-info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
          >
            Chat Sphere may display inaccurate info, including about people, so
            double-check its response.
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Main;
