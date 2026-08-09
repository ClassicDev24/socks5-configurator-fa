# Socks5 Configurator

افزونه‌ی Chrome برای اتصال مرورگر به یک پروکسی محلی SOCKS5، مانند خروجی Nekoray، با امکان تعریف دامنه‌هایی که باید مستقیماً و بدون عبور از پروکسی باز شوند.

این پروژه یک فورک از [socks5-configurator](https://github.com/txthinking/socks5-configurator) است که با حفظ قابلیت اصلی پروژه، رابط کاربری و روند استفاده از افزونه ساده‌تر و بهبود داده شده است.

## تغییرات

### Popup

در نسخه‌ی اصلی برای فعال یا غیرفعال کردن پروکسی و مدیریت لیست Bypass نیاز به باز کردن صفحه‌ی تنظیمات در یک تب جداگانه بود.

در این نسخه یک Popup به افزونه اضافه شده که امکان انجام عملیات اصلی را مستقیماً از Toolbar مرورگر فراهم می‌کند:

- فعال و غیرفعال کردن پروکسی
- اضافه کردن دامنه‌ی سایت فعلی به لیست Bypass
- حذف دامنه‌ی سایت فعلی از لیست Bypass
- مشاهده‌ی وضعیت فعلی Proxy و Bypass

### پشتیبانی از زبان فارسی

رابط کاربری افزونه به دو زبان فارسی و انگلیسی در دسترس است.

- پشتیبانی از فارسی
- پشتیبانی از انگلیسی
- امکان تغییر زبان از داخل افزونه

### Dark Mode

رابط کاربری از حالت Dark Mode پشتیبانی می‌کند و به‌صورت خودکار با Theme مرورگر یا تنظیمات سیستم هماهنگ می‌شود.

### بهبود رابط کاربری

صفحه‌ی تنظیمات اصلی همچنان برای مدیریت کامل تنظیمات و لیست Bypass در دسترس است، اما رابط کاربری آن بازطراحی و ساده‌تر شده است.

## تفاوت با نسخه‌ی اصلی

| قابلیت | نسخه اصلی | این نسخه |
|---|---|---|
| Popup | ندارد | دارد |
| مدیریت Proxy از Toolbar | ندارد | دارد |
| Bypass دامنه‌ی فعلی با یک کلیک | ندارد | دارد |
| حذف Bypass دامنه‌ی فعلی | ندارد | دارد |
| زبان فارسی | ندارد | دارد |
| زبان انگلیسی | دارد | دارد |
| Dark Mode | ندارد | دارد |
| بهبود UI | - | دارد |

## نصب

### Load Unpacked

برای نصب نسخه‌ی توسعه‌ای:

1. وارد `chrome://extensions` شوید.
2. گزینه‌ی **Developer mode** را فعال کنید.
3. روی **Load unpacked** کلیک کنید.
4. پوشه‌ی پروژه را انتخاب کنید.

پس از نصب، افزونه در لیست Extensions نمایش داده می‌شود.

## تنظیم Proxy

افزونه برای اتصال مرورگر به یک SOCKS5 Proxy محلی طراحی شده است.

برای مثال می‌توان از خروجی SOCKS5 نرم‌افزارهایی مانند Nekoray استفاده کرد.

آدرس و پورت Proxy را می‌توان از تنظیمات افزونه پیکربندی کرد.

## پروژه‌ی اصلی

این پروژه بر پایه‌ی پروژه‌ی زیر توسعه داده شده است:

[socks5-configurator](https://github.com/txthinking/socks5-configurator)

تغییرات این Fork عمدتاً شامل بهبود رابط کاربری، اضافه شدن Popup، پشتیبانی از زبان فارسی و Dark Mode است.

## License

MIT License

این پروژه تحت همان مجوز پروژه‌ی اصلی منتشر شده است.

---

# Socks5 Configurator

A Chrome extension for connecting the browser to a local SOCKS5 proxy, such as a Nekoray SOCKS5 output, with support for per-domain proxy bypass rules.

This project is a fork of the original [socks5-configurator](https://github.com/txthinking/socks5-configurator), with UI and usability improvements while preserving the core functionality.

## Changes

### Popup

A browser action popup has been added to provide quick access to the main proxy controls.

It allows users to:

- Enable or disable the proxy
- Add the current domain to the bypass list
- Remove the current domain from the bypass list
- View the current Proxy and Bypass status

### Persian Language Support

The extension now supports both Persian and English.

- Persian (`fa`)
- English (`en`)
- Language switcher in the UI

### Dark Mode

The UI supports Dark Mode and automatically follows the browser or system theme.

### UI Improvements

The original settings page is still available for advanced configuration and full bypass-list management, with an updated and simplified interface.

## Differences from Upstream

| Feature | Upstream | This Fork |
|---|---|---|
| Popup | No | Yes |
| Proxy controls from Toolbar | No | Yes |
| One-click bypass for current domain | No | Yes |
| Remove bypass for current domain | No | Yes |
| Persian language | No | Yes |
| English language | Yes | Yes |
| Dark Mode | No | Yes |
| Updated UI | No | Yes |

## Installation

### Load Unpacked

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the project directory

## Proxy Configuration

The extension is designed to work with a local SOCKS5 proxy.

For example, it can be used with a SOCKS5 endpoint provided by applications such as Nekoray.

The proxy address and port can be configured through the extension settings.

## Upstream

Original project:

https://github.com/txthinking/socks5-configurator

## License

MIT License.

This project is distributed under the same license as the original project.
