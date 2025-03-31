import { HttpEvent, HttpInterceptorFn } from '@angular/common/http'
import { of, tap } from 'rxjs'

const cache = new Map<string, { date: Date; value: HttpEvent<unknown> }>()

export const cacheInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.method !== 'GET') {
    return next(request)
  }

  const cached = cache.get(request.url)

  if (cached && cached.date.getTime() + 300000 > Date.now()) {
    return of(cached.value)
  }

  return next(request).pipe(
    tap((response) =>
      cache.set(request.url, { date: new Date(), value: response }),
    ),
  )
}
