import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { LoaderStore } from '../stores/loader.store'
import { finalize } from 'rxjs'

export const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const store = inject(LoaderStore)

  store.setLoading(true)

  return next(request).pipe(finalize(() => store.setLoading(false)))
}
