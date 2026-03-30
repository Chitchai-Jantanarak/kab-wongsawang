'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: boolean;
  delay?: number;
}

export function AnimatedContainer({
  children,
  className = '',
  staggerChildren = false,
  delay = 0,
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ...(staggerChildren && { staggerChildren: 0.1 }),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function AnimatedItem({ children, className = '', index = 0 }: AnimatedItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
