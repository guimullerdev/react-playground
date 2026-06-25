import { useEffect, useState, useRef } from 'react'

const STATE_LABELS = {
  installed: 'waiting', // já instalou, mas tem um SW antigo controlando ainda
}

export function useServiceWorker(scriptUrl = '/sw.js') {
  const [status, setStatus] = useState('idle')
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const waitingWorkerRef = useRef(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    function watchWorker(worker) {
      const update = () => {
        const label = STATE_LABELS[worker.state] ?? worker.state
        setStatus(label)

        // Só é "update disponível" se já existe algo controlando a página.
        // Sem controller = primeira instalação, não atualização.
        if (worker.state === 'installed' && navigator.serviceWorker.controller) {
          waitingWorkerRef.current = worker
          setUpdateAvailable(true)
        }
      }
      worker.addEventListener('statechange', update)
      update() // roda já com o estado atual, sem esperar o próximo statechange
    }

    navigator.serviceWorker.register(scriptUrl).then((registration) => {
      const current = registration.installing || registration.waiting || registration.active
      if (current) watchWorker(current)

      registration.addEventListener('updatefound', () => {
        watchWorker(registration.installing)
      })
    }).catch((err) => {
      setStatus('error')
      console.error('[useServiceWorker] registration failed', err)
    })

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  }, [scriptUrl])

  function applyUpdate() {
    waitingWorkerRef.current?.postMessage({ type: 'SKIP_WAITING' })
  }

  return { status, updateAvailable, applyUpdate }
}