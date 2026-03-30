import { Component, OnDestroy, OnInit, signal } from '@angular/core';


interface HeroImage {
  id: number;
  url: string;
  alt?: string;
}
@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {


  // TODO: reemplazar con servicio real cuando conectemos la API
  images = signal<HeroImage[]>([
    { id: 1, url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600', alt: 'Colección Primavera' },
    { id: 2, url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600', alt: 'Colección Verano' },
    { id: 3, url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600', alt: 'Colección Exclusiva' },
  ]);

  currentIndex = signal(0);
  isTransitioning = signal(false);

  private intervalId?: ReturnType<typeof setInterval>;
  private readonly INTERVAL_MS = 5000;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy():void {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.next();
    }, this.INTERVAL_MS);
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  restartAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  goTo(index: number) {
    if (index === this.currentIndex() || this.isTransitioning()) return;
    this.isTransitioning.set(true);
    this.currentIndex.set(index);
    setTimeout(() => this.isTransitioning.set(false), 600);
    this.restartAutoPlay();
  }

  next() {
    const next = (this.currentIndex() + 1) % this.images().length;
    this.goTo(next);
  }

  prev() {
    const prev = (this.currentIndex() - 1 + this.images().length) % this.images().length;
    this.goTo(prev);
  }
}
