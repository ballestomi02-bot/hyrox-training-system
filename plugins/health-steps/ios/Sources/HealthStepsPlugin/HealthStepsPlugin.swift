import Capacitor
import HealthKit

@objc(HealthStepsPlugin)
public class HealthStepsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "HealthStepsPlugin"
    public let jsName = "HealthSteps"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "readToday", returnType: CAPPluginReturnPromise)
    ]
    private let healthStore = HKHealthStore()

    @objc public func isAvailable(_ call: CAPPluginCall) {
        call.resolve(["available": HKHealthStore.isHealthDataAvailable()])
    }

    @objc public func requestAuthorization(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable(),
              let stepType = HKObjectType.quantityType(forIdentifier: .stepCount) else {
            call.reject("Apple Salud no está disponible en este dispositivo.")
            return
        }
        healthStore.requestAuthorization(toShare: [], read: [stepType]) { _, error in
            if let error {
                call.reject("No se pudo solicitar acceso a los pasos.", nil, error)
            } else {
                call.resolve(["requested": true])
            }
        }
    }

    @objc public func readToday(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable(),
              let stepType = HKObjectType.quantityType(forIdentifier: .stepCount) else {
            call.reject("Apple Salud no está disponible en este dispositivo.")
            return
        }
        let start = Calendar.current.startOfDay(for: Date())
        let now = Date()
        let predicate = HKQuery.predicateForSamples(withStart: start, end: now, options: .strictStartDate)
        let query = HKStatisticsQuery(quantityType: stepType, quantitySamplePredicate: predicate, options: .cumulativeSum) { _, statistics, error in
            if let error {
                call.reject("No se pudieron consultar los pasos de hoy.", nil, error)
                return
            }
            let steps = statistics?.sumQuantity()?.doubleValue(for: .count()) ?? 0
            call.resolve(["steps": max(0, Int(steps.rounded(.down))), "date": ISO8601DateFormatter().string(from: now)])
        }
        healthStore.execute(query)
    }
}
