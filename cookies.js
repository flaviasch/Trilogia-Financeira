/*
 * Aviso de cookies + Pixel da Meta carregado só com consentimento (LGPD,
 * recomendação da ANPD pra cookies de publicidade). Incluído em todas as
 * páginas do site com <script src="/cookies.js" defer></script>.
 *
 * Escolha guardada no navegador (localStorage):
 *   'aceito'   → carrega o Pixel em toda página
 *   'recusado' → nunca carrega o Pixel
 *   (vazio)    → mostra o aviso
 * A Política de Privacidade chama window.gerenciarCookies() pra mudar a escolha.
 */
(function () {
  var CHAVE = 'consentimento_cookies';
  var PIXEL_ID = '1821769362282319';

  function ler() { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } }
  function gravar(v) { try { localStorage.setItem(CHAVE, v); } catch (e) {} }

  // Código oficial do Meta Pixel (sem o <noscript>, que dispararia sem consentimento).
  function carregarPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function fecharAviso() {
    var el = document.getElementById('aviso-cookies');
    if (el) el.parentNode.removeChild(el);
  }

  function mostrarAviso() {
    if (document.getElementById('aviso-cookies')) return;
    var aviso = document.createElement('div');
    aviso.id = 'aviso-cookies';
    aviso.setAttribute('role', 'dialog');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.style.cssText = [
      'position:fixed', 'left:16px', 'right:16px', 'bottom:16px', 'z-index:2147483000',
      'max-width:640px', 'margin:0 auto', 'background:#0D2B45', 'color:#F8F1E7',
      'border:1px solid rgba(207,174,101,0.45)', 'border-radius:14px',
      'box-shadow:0 10px 30px rgba(0,0,0,0.25)', 'padding:16px 18px',
      'font-family:Manrope,Arial,sans-serif', 'font-size:14px', 'line-height:1.5',
      'display:flex', 'flex-wrap:wrap', 'align-items:center', 'gap:12px'
    ].join(';');

    var texto = document.createElement('p');
    texto.style.cssText = 'margin:0;flex:1 1 280px;';
    texto.innerHTML = 'Usamos cookies da Meta para medir as visitas e mostrar nossos conteúdos a quem já passou por aqui. ' +
      'Você escolhe. <a href="/privacidade/" style="color:#CFAE65;text-decoration:underline;">Política de Privacidade</a>';

    var botoes = document.createElement('div');
    botoes.style.cssText = 'display:flex;gap:8px;flex:0 0 auto;';

    var recusar = document.createElement('button');
    recusar.type = 'button';
    recusar.textContent = 'Recusar';
    recusar.style.cssText = 'cursor:pointer;font:inherit;font-weight:600;padding:9px 16px;border-radius:999px;' +
      'background:transparent;color:#F8F1E7;border:1px solid rgba(248,241,231,0.4);';

    var aceitar = document.createElement('button');
    aceitar.type = 'button';
    aceitar.textContent = 'Aceitar';
    aceitar.style.cssText = 'cursor:pointer;font:inherit;font-weight:700;padding:9px 18px;border-radius:999px;' +
      'background:#CFAE65;color:#0D2B45;border:1px solid #CFAE65;';

    recusar.addEventListener('click', function () { gravar('recusado'); fecharAviso(); });
    aceitar.addEventListener('click', function () { gravar('aceito'); fecharAviso(); carregarPixel(); });

    botoes.appendChild(recusar);
    botoes.appendChild(aceitar);
    aviso.appendChild(texto);
    aviso.appendChild(botoes);
    document.body.appendChild(aviso);
  }

  // Chamado pela Política de Privacidade ("Alterar minha escolha de cookies").
  window.gerenciarCookies = function () {
    try { localStorage.removeItem(CHAVE); } catch (e) {}
    mostrarAviso();
  };

  var escolha = ler();
  if (escolha === 'aceito') {
    carregarPixel();
  } else if (escolha !== 'recusado') {
    if (document.body) mostrarAviso();
    else document.addEventListener('DOMContentLoaded', mostrarAviso);
  }
})();
