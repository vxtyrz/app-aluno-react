import './Botao.css'

function Botao({ children, type = 'button', variante = 'primario', onClick, disabled, larguraTotal }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`botao botao--${variante} ${larguraTotal ? 'botao--largura-total' : ''} ${disabled ? 'botao--disabled' : ''}`}
    >
      {children}
    </button>
  )
}

export default Botao
