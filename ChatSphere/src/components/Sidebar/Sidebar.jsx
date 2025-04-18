import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Plus, MessageSquare, HelpCircle, History, Settings } from 'lucide-react';
import { Context } from '../../context/Context';

const Sidebar = () => {
  const [extended, setExtended] = React.useState(false);
  const { onSent, previousPrompt, setrecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => { 
    setrecentPrompt(prompt);
    await onSent(prompt);
  };

  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '72px' }
  };

  const menuItems = [
    { icon: HelpCircle, label: 'Help' },
    { icon: History, label: 'Activity' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <motion.div
      className="h-screen bg-gray-900 text-white flex flex-col"
      initial="collapsed"
      animate={extended ? 'expanded' : 'collapsed'}
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-gray-800 rounded-lg"
            onClick={() => setExtended(prev => !prev)}
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 p-3 mb-6 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          onClick={newChat}
        >
          <Plus className="w-5 h-5" />
          <AnimatePresence>
            {extended && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="whitespace-nowrap"
              >
                New Chat
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {extended && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-gray-400 mb-2 px-3"
              >
                Recent
              </motion.p>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            {previousPrompt.map((prompt, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 w-full p-3 rounded-lg text-left"
                onClick={() => loadPrompt(prompt)}
              >
                <MessageSquare className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {extended && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="truncate text-sm"
                    >
                      {prompt}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-800">
        {menuItems.map(({ icon: Icon, label }) => (
          <motion.button
            key={label}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-left mb-1 last:mb-0"
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {extended && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
