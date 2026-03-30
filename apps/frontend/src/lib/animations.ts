import gsap from 'gsap';

export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    verySlow: 1.5,
  },
  ease: {
    easeInQuad: 'power1.in',
    easeOutQuad: 'power1.out',
    easeInOutQuad: 'power1.inOut',
    easeInCubic: 'power2.in',
    easeOutCubic: 'power2.out',
    easeInOutCubic: 'power2.inOut',
    easeInQuart: 'power3.in',
    easeOutQuart: 'power3.out',
    easeInOutQuart: 'power3.inOut',
  },
};

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const cardHoverVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -10 },
};

export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const slideInVariants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
  exit: { opacity: 0, x: 50 },
};

export const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleInVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export function createRevealTimeline(element: Element | null) {
  if (!element) return null;

  const tl = gsap.timeline();
  const items = element.querySelectorAll('[data-reveal-item]');

  tl.fromTo(
    items,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
    }
  );

  return tl;
}

export function createTextRevealTimeline(element: Element | null) {
  if (!element) return null;

  const tl = gsap.timeline();
  const text = element.textContent || '';

  const spans = text
    .split('')
    .map((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      return span;
    });

  element.innerHTML = '';
  spans.forEach((span) => element.appendChild(span));

  tl.fromTo(
    spans,
    { opacity: 0, y: 10 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power2.out',
    }
  );

  return tl;
}

export function createSectionTransitionTimeline(element: Element | null) {
  if (!element) return null;

  const tl = gsap.timeline();

  tl.fromTo(element, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

  return tl;
}

export function enableMagneticCursor(element: HTMLElement | null) {
  if (!element) return;

  element.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distanceX = (x - centerX) * 0.1;
    const distanceY = (y - centerY) * 0.1;

    gsap.to(element, {
      x: distanceX,
      y: distanceY,
      duration: 0.3,
      overwrite: 'auto',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
  });
}

export function createBlurRevealAnimation(element: Element | null) {
  if (!element) return null;

  const tl = gsap.timeline();

  tl.fromTo(
    element,
    { filter: 'blur(10px)', opacity: 0 },
    { filter: 'blur(0px)', opacity: 1, duration: 1, ease: 'power2.inOut' }
  );

  return tl;
}

export function staggerChildrenAnimation(
  container: Element | null,
  options: {
    duration?: number;
    stagger?: number;
    fromY?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.6, stagger = 0.1, fromY = 30, ease = 'power3.out' } = options;

  if (!container) return null;

  const tl = gsap.timeline();
  const children = container.children;

  tl.fromTo(
    children,
    { opacity: 0, y: fromY },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
    }
  );

  return tl;
}
