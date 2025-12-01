<?php
    function buildGroupedMenuArray(string $pagesUrl): array
{
    // Fetch & decode JSON
    $json = file_get_contents($pagesUrl);
    if ($json === false) {
        return []; // or throw exception
    }

    $data = json_decode($json, true);
    if (!isset($data['pages']) || !is_array($data['pages'])) {
        return [];
    }

    // Group pages by section_id
    $groupedSections = [];

    foreach ($data['pages'] as $page) {
        $sectionId = (string) $page['section_id'];
        $sectionPrompt = $page['section_prompt'];

        if (!isset($groupedSections[$sectionId])) {
            $groupedSections[$sectionId] = [
                'nonNull' => [],
                'null' => []
            ];
        }

        if ($sectionPrompt === null) {
            $groupedSections[$sectionId]['null'][] = $page;
        } else {
            $groupedSections[$sectionId]['nonNull'][] = $page;
        }
    }

    // Build final grouped array
    $finalGroupedArray = [];

    foreach ($groupedSections as $sectionId => $groups) {
        $sectionPrompt = null;

        if (count($groups['nonNull']) > 0) {
            $sectionPrompt = $groups['nonNull'][0]['section_prompt'];
        }

        $finalGroupedArray[] = [
            'section_id'     => (string) $sectionId,
            'section_prompt' => $sectionPrompt,
            'pages'          => array_merge($groups['nonNull'], $groups['null'])
        ];
    }

    // Ensure section_id = "0" exists (optional)
    $hasZero = false;
    foreach ($finalGroupedArray as $section) {
        if ($section['section_id'] === "0") {
            $hasZero = true;
            break;
        }
    }

    // Sort by custom order
    $customOrder = ["0", "8", "2", "5", "1"];

    usort($finalGroupedArray, function ($a, $b) use ($customOrder) {
        return array_search($a['section_id'], $customOrder)
             - array_search($b['section_id'], $customOrder);
    });

    // Optional deep clone
    return json_decode(json_encode($finalGroupedArray), true);
}

?>