(function () {
  const card = document.querySelector('.calc-card');
  if (!card) return;

  const questions = card.querySelectorAll('.calc-question');
  const resultBox = card.querySelector('.calc-result');
  const answers = {};

  const plans = {
    inicial: {
      label: 'Plan Inicial',
      price: '$150.000 – $199.000',
      desc: 'Presencia online para que te encuentren y te contacten, sin necesidad de un panel propio.'
    },
    crecimiento: {
      label: 'Plan Crecimiento',
      price: '$220.000 – $299.000',
      desc: 'Sistema de pedidos o catálogo con panel propio para que manejes vos mismo tu contenido.'
    },
    medida: {
      label: 'Plan A Medida',
      price: 'Desde $400.000',
      desc: 'Sistema con lógica propia: pagos online, stock, variantes o lo que tu negocio necesite.'
    }
  };

  function showQuestion(n) {
    questions.forEach(q => q.hidden = q.dataset.q !== String(n));
    resultBox.hidden = true;
  }

  function calcResult() {
    let plan = 'inicial';

    if (answers.q1 === '3' || answers.q2 === 'si') {
      plan = 'medida';
    } else if (answers.q1 === '2' || answers.q3 === 'si') {
      plan = 'crecimiento';
    }

    const data = plans[plan];
    card.querySelector('#calc-plan').textContent = data.label;
    card.querySelector('#calc-price').textContent = data.price;
    card.querySelector('#calc-desc').textContent = data.desc;

    questions.forEach(q => q.hidden = true);
    resultBox.hidden = false;
  }

  card.addEventListener('click', function (e) {
    const opt = e.target.closest('.calc-opt');
    if (opt) {
      const question = opt.closest('.calc-question');
      const qNum = Number(question.dataset.q);
      answers['q' + qNum] = opt.dataset.value;

      if ((qNum === 1 && answers.q1 === '3') || (qNum === 2 && answers.q2 === 'si')) {
        calcResult();
        return;
      }

      const next = qNum + 1;
      if (next <= 3) {
        showQuestion(next);
      } else {
        calcResult();
      }
      return;
    }

    if (e.target.classList.contains('calc-back')) {
      const question = e.target.closest('.calc-question');
      const qNum = Number(question.dataset.q);
      delete answers['q' + qNum];
      showQuestion(qNum - 1);
      return;
    }

    if (e.target.id === 'calc-reset') {
      Object.keys(answers).forEach(k => delete answers[k]);
      showQuestion(1);
    }
  });
})();