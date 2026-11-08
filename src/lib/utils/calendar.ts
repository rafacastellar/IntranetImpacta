import type { ReuniaoItem } from '$lib/types/reunioesAtas';

function formatIsoForCalendar(dateStr: string): string {
	const d = new Date(dateStr);
	return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

export function getGoogleCalendarUrl(reuniao: ReuniaoItem): string {
	const start = formatIsoForCalendar(reuniao.data_hora_inicio);
	const end = formatIsoForCalendar(reuniao.data_hora_fim);
	const title = encodeURIComponent(reuniao.titulo);
	const details = encodeURIComponent(
		`${reuniao.descricao || ''}\n\nPauta Prévia:\n${reuniao.atas?.pauta_previa || 'Não informada'}\n\nCoordenação Impacta`
	);
	const location = encodeURIComponent(reuniao.local_link || 'Faculdade Impacta');

	return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

export function getOutlookCalendarUrl(reuniao: ReuniaoItem): string {
	const start = new Date(reuniao.data_hora_inicio).toISOString();
	const end = new Date(reuniao.data_hora_fim).toISOString();
	const subject = encodeURIComponent(reuniao.titulo);
	const body = encodeURIComponent(
		`${reuniao.descricao || ''}\n\nPauta Prévia:\n${reuniao.atas?.pauta_previa || 'Não informada'}`
	);
	const location = encodeURIComponent(reuniao.local_link || 'Faculdade Impacta');

	return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&startdt=${start}&enddt=${end}&body=${body}&location=${location}`;
}

export function downloadIcsFile(reuniao: ReuniaoItem): void {
	const start = formatIsoForCalendar(reuniao.data_hora_inicio);
	const end = formatIsoForCalendar(reuniao.data_hora_fim);
	const now = formatIsoForCalendar(new Date().toISOString());

	const icsContent = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//Faculdade Impacta//Intranet Docente//PT',
		'CALSCALE:GREGORIAN',
		'METHOD:REQUEST',
		'BEGIN:VEVENT',
		`UID:impacta-reuniao-${reuniao.id}@impacta.edu.br`,
		`DTSTAMP:${now}`,
		`DTSTART:${start}`,
		`DTEND:${end}`,
		`SUMMARY:${reuniao.titulo}`,
		`DESCRIPTION:${(reuniao.descricao || '').replace(/\n/g, '\\n')}`,
		`LOCATION:${reuniao.local_link || 'Faculdade Impacta'}`,
		'STATUS:CONFIRMED',
		'END:VEVENT',
		'END:VCALENDAR'
	].join('\r\n');

	const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `reuniao_impacta_${reuniao.id}.ics`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(link.href);
}

