window.PrerenderingRefreshHelper = window.PrerenderingRefreshHelper || {};
PrerenderingRefreshHelper.createSpeculationRulesScript = function(rule, attributes) {
    const script = document.createElement("script");
    script.setAttribute("type", "speculationrules");
    for (const attribute of attributes) {
        script.setAttribute(attribute.name, attribute.value);
    }
    script.textContent = rule;
    return script
}

window.PrerenderingRefreshHelper.attachSpeculationRulesScriptAfter = function(parent, script, t) {
    setTimeout(() => { parent.appendChild(script); }, t * 10)
}

document.addEventListener("DOMContentLoaded", () => {
    const wp = window.PrerenderingRefreshHelper;
    const refreshNeededRules = document.querySelectorAll("[data-prerender-refresh]");
    for (let script of refreshNeededRules.values()) {
        const refreshSec = script.getAttribute("data-prerender-refresh");

        let current = script;
        setInterval(() => {
            const parent = current.parentNode;
            const rule = current.textContent;
            const attributes = current.attributes;
            const newScript = wp.createSpeculationRulesScript(rule, attributes)
            parent.removeChild(current);
            wp.attachSpeculationRulesScriptAfter(parent, newScript, 5);
            current = newScript;
        }, parseInt(refreshSec) * 1000);
    }
});
