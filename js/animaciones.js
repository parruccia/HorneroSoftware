const bricks = document.querySelectorAll('.brick');
if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    bricks.forEach(b => io.observe(b));
} else {
    bricks.forEach(b => b.classList.add('visible'));
}