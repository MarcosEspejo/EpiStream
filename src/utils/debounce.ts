/**
 * Función debounce para limitar la frecuencia de ejecución de una función
 * @param func - Función a ejecutar
 * @param delay - Retraso en milisegundos
 * @returns Función debounced
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}