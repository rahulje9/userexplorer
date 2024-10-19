type Listener = (key: string) => void

export class MMKVFaker {
  private data: { [key: string]: string | undefined } = {}
  private listeners: Listener[] = []

  getString(key: string): string | undefined {
    return this.data[key]
  }

  set(key: string, value: string): void {
    this.data[key] = value
    this.notifyListeners(key)
  }

  delete(key: string): void {
    delete this.data[key]
    this.notifyListeners(key)
  }

  clearAll(): void {
    this.data = {}
    Object.keys(this.data).forEach((key) => this.notifyListeners(key))
  }

  addOnValueChangedListener(listener: Listener): () => void {
    this.listeners.push(listener)
    return () => {
      const index = this.listeners.indexOf(listener)
      if (index > -1) {
        this.listeners.splice(index, 1)
      }
    }
  }

  private notifyListeners(key: string): void {
    this.listeners.forEach((listener) => listener(key))
  }
}
